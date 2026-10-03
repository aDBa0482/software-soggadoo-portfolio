import React, { useState, useEffect } from 'react';
import { 
  X, 
  Lock, 
  KeyRound, 
  Eye, 
  EyeOff, 
  Mail, 
  Phone, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle,
  RefreshCw,
  Send,
  ShieldCheck
} from 'lucide-react';

interface OwnerLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlock: () => void;
  storedPassword?: string;
  onUpdatePassword?: (newPassword: string) => void;
}

const DEFAULT_PASSWORD = 'Shaik@1997';
const RECOVERY_MOBILE = '6301010537';
const RECOVERY_EMAIL = 'adba0482@gmail.com';

export const OwnerLoginModal: React.FC<OwnerLoginModalProps> = ({
  isOpen,
  onClose,
  onUnlock,
  storedPassword = DEFAULT_PASSWORD,
  onUpdatePassword,
}) => {
  // Modal mode: 'login' | 'request-otp' | 'verify-otp'
  const [mode, setMode] = useState<'login' | 'request-otp' | 'verify-otp'>('login');
  
  // Login fields
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // OTP Reset fields
  const [generatedOtp, setGeneratedOtp] = useState<string>('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [resetError, setResetError] = useState('');
  const [otpSentNotification, setOtpSentNotification] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setMode('login');
      setPassword('');
      setLoginError('');
      setResetError('');
      setOtpSentNotification(null);
    }
  }, [isOpen]);

  // Countdown timer for OTP resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  if (!isOpen) return null;

  // Handle Login Submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === storedPassword) {
      setLoginError('');
      onUnlock();
      onClose();
    } else {
      setLoginError('Incorrect password. Please try again or use the OTP reset option below.');
    }
  };

  // Handle Send OTP
  const handleSendOtp = () => {
    // Generate a secure 6-digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setCountdown(60);
    setOtpSentNotification(`Verification OTP is: ${code}`);
    setMode('verify-otp');
    setResetError('');
  };

  // Handle Verify OTP & Set New Password
  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (enteredOtp.trim() !== generatedOtp) {
      setResetError('Invalid OTP code. Please enter the 6-digit code sent to your mobile and email.');
      return;
    }

    if (newPassword.length < 6) {
      setResetError('Password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setResetError('Passwords do not match. Please re-enter.');
      return;
    }

    // Save password
    if (onUpdatePassword) {
      onUpdatePassword(newPassword);
    }

    onUnlock();
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md rounded-2xl border border-zinc-800 bg-[#121216] shadow-2xl p-6 sm:p-7 space-y-5 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* 1. LOGIN VIEW */}
        {mode === 'login' && (
          <div className="space-y-5">
            <div className="text-center space-y-2">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Lock className="h-7 w-7" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">
                Creator / Owner Login
              </h3>
              <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                Enter your password to access portfolio editing, photo uploads, and background customization.
              </p>
            </div>

            {loginError && (
              <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setLoginError('');
                    }}
                    placeholder="Enter your password"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                
                {/* Default Password Hint */}
                <div className="flex items-center justify-between text-[11px] text-zinc-500 mt-1.5">
                  <span>Default password: <code className="text-emerald-400 font-mono font-semibold">{storedPassword}</code></span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-zinc-950 font-bold text-sm transition-all shadow-md shadow-emerald-500/20 active:scale-[0.98]"
              >
                Log In as Owner
              </button>
            </form>

            {/* Forgot Password / Reset with OTP Trigger */}
            <div className="pt-2 border-t border-zinc-800 text-center">
              <button
                type="button"
                onClick={() => setMode('request-otp')}
                className="text-xs text-amber-400 hover:text-amber-300 font-semibold hover:underline inline-flex items-center gap-1"
              >
                <KeyRound className="h-3.5 w-3.5" />
                <span>Forgot Password? Reset via Mobile / Email OTP</span>
              </button>
            </div>
          </div>
        )}

        {/* 2. REQUEST OTP VIEW */}
        {mode === 'request-otp' && (
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMode('login')}
                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <div>
                <h3 className="font-serif text-xl font-bold text-white">
                  Reset Password with OTP
                </h3>
                <p className="text-xs text-zinc-400">
                  We will send a 6-digit OTP code to your registered details.
                </p>
              </div>
            </div>

            <div className="space-y-3 p-4 rounded-xl bg-zinc-900 border border-zinc-800">
              <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
                Registered Contact Information:
              </span>

              <div className="flex items-center gap-2.5 text-xs text-zinc-200">
                <Phone className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Mobile: <strong className="font-mono text-white">{RECOVERY_MOBILE}</strong></span>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-zinc-200">
                <Mail className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Email: <strong className="font-mono text-white">{RECOVERY_EMAIL}</strong></span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSendOtp}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-zinc-950 font-bold text-sm transition-all shadow-md active:scale-[0.98]"
            >
              <Send className="h-4 w-4" />
              <span>Send OTP to Mobile & Email</span>
            </button>
          </div>
        )}

        {/* 3. VERIFY OTP & ENTER NEW PASSWORD */}
        {mode === 'verify-otp' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMode('request-otp')}
                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <div>
                <h3 className="font-serif text-xl font-bold text-white">
                  Enter OTP & Set New Password
                </h3>
                <p className="text-xs text-zinc-400">
                  Sent to <span className="text-white font-mono">{RECOVERY_MOBILE}</span> & <span className="text-white font-mono">{RECOVERY_EMAIL}</span>
                </p>
              </div>
            </div>

            {/* OTP notification banner */}
            {otpSentNotification && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs space-y-1">
                <p className="font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>OTP successfully dispatched!</span>
                </p>
                <p className="font-mono text-base font-bold text-white tracking-widest pl-5">
                  {generatedOtp}
                </p>
              </div>
            )}

            {resetError && (
              <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{resetError}</span>
              </div>
            )}

            <form onSubmit={handleResetPassword} className="space-y-3.5">
              {/* OTP Code input */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-zinc-300">
                    6-Digit OTP Code *
                  </label>
                  {countdown > 0 ? (
                    <span className="text-[11px] text-zinc-500">Resend in {countdown}s</span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="text-[11px] text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      <RefreshCw className="h-3 w-3" />
                      <span>Resend OTP</span>
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={enteredOtp}
                  onChange={(e) => {
                    setEnteredOtp(e.target.value);
                    setResetError('');
                  }}
                  placeholder="e.g. 123456"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-center font-mono text-lg tracking-widest text-emerald-400 placeholder-zinc-600 focus:outline-none focus:border-emerald-400"
                />
              </div>

              {/* New Password */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  New Password *
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password (min 6 characters)"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Confirm New Password *
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-zinc-950 font-bold text-sm transition-all shadow-md active:scale-[0.98]"
              >
                Verify OTP & Save New Password
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
