import { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Database, Signal, X, ExternalLink } from 'lucide-react';

interface DatabaseStatusProps {
  variant?: 'floating' | 'navbar';
}

export function DatabaseStatus({ variant = 'floating' }: DatabaseStatusProps) {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [error, setError] = useState<string>('');
  const [latency, setLatency] = useState<number>(0);
  const [showMonitor, setShowMonitor] = useState(false);
  const [lastChecked, setLastChecked] = useState<Date>(new Date());

  useEffect(() => {
    checkDatabaseConnection();
    const interval = setInterval(checkDatabaseConnection, 30000);
    return () => clearInterval(interval);
  }, []);

  const checkDatabaseConnection = async () => {
    try {
      const startTime = performance.now();
      const response = await fetch('/api/health');
      const endTime = performance.now();
      setLatency(Math.round(endTime - startTime));
      setLastChecked(new Date());

      if (response.ok) {
        setStatus('connected');
      } else {
        setStatus('error');
        const data = await response.json();
        setError(data.error);
      }
    } catch (err) {
      setStatus('error');
      setError('Failed to connect to database');
    }
  };

  if (status === 'checking') {
    return null;
  }

  const getSignalStrength = (latency: number) => {
    if (latency < 100) return 'Excellent';
    if (latency < 300) return 'Good';
    if (latency < 600) return 'Fair';
    return 'Poor';
  };

  const getSignalColor = (latency: number) => {
    if (latency < 100) return 'text-green-500';
    if (latency < 300) return 'text-blue-500';
    if (latency < 600) return 'text-yellow-500';
    return 'text-red-500';
  };

  const StatusButton = () => (
    <button
      onClick={() => setShowMonitor(true)}
      className={`${
        variant === 'floating'
          ? 'fixed bottom-4 right-4 p-3 shadow-lg'
          : 'p-2'
      } rounded-full transition-colors ${
        status === 'connected' 
          ? 'bg-green-50 text-green-700 hover:bg-green-100'
          : 'bg-red-50 text-red-700 hover:bg-red-100'
      }`}
    >
      <Database className={variant === 'floating' ? 'w-5 h-5' : 'w-6 h-6'} />
    </button>
  );

  return (
    <>
      <StatusButton />

      {showMonitor && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowMonitor(false)}
          />
          <div className={`fixed bg-white rounded-lg shadow-xl z-50 ${
            variant === 'floating'
              ? 'bottom-20 right-4 w-80'
              : 'top-16 right-4 w-80'
          }`}>
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-semibold flex items-center gap-2">
                <Database className="w-4 h-4" />
                Database Status
              </h3>
              <button
                onClick={() => setShowMonitor(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Connection:</span>
                <div className="flex items-center gap-2">
                  {status === 'connected' ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-green-700">Connected</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-red-700">Error</span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Signal Strength:</span>
                <div className="flex items-center gap-2">
                  <Signal className={`w-4 h-4 ${getSignalColor(latency)}`} />
                  <span className={getSignalColor(latency)}>
                    {getSignalStrength(latency)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Latency:</span>
                <span className={getSignalColor(latency)}>{latency}ms</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Last Checked:</span>
                <span className="text-gray-700">
                  {lastChecked.toLocaleTimeString()}
                </span>
              </div>

              {status === 'error' && (
                <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="mt-4 pt-4 border-t">
                <button
                  onClick={checkDatabaseConnection}
                  className="w-full py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Test Connection
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}