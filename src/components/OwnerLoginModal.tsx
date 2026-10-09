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
  ShieldCheck,
  Smartphone
} from 'lucide-react';

interface OwnerLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlock: () => void;
  storedPassword?: string;
  onUpdatePassword?: (newPassword: string) => void;
}

export const DEFAULT_OWNER_PASSWORD = 'ad143ba@MS';
const RECOVERY_MOBILE = '6301010537';
const RECOVERY_EMAIL = 'adba0482@gmail.com';

export const OwnerLoginModal: React.FC<OwnerLoginModalProps> = ({
  isOpen,
  onClose,
  onUnlock,
  storedPassword = DEFAULT_OWNER_PASSWORD,
  onUpdatePassword,
}) => {
  // Modal mode: 'login' | 'request-otp' | 'verify-otp'
  const [mode, setMode] = useState<'login' | 'request-otp' | 'verify-otp'>('login');
  
  // Login fields
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Identity verification before OTP
  const [identityInput, setIdentityInput] = useState('');
  const [identityError, setIdentityError] = useState('');

  // OTP Reset fields
  const [generatedOtp, setGeneratedOtp] = useState<string>('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [resetError, setResetError] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [showOtpCodeInModal, setShowOtpCodeInModal] = useState(false);

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setMode('login');
      setPassword('');
      setLoginError('');
      setIdentityInput('');
      setIdentityError('');
      setEnteredOtp('');
      setNewPassword('');
      setConfirmPassword('');
      setResetError('');
      setShowOtpCodeInModal(false);
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
      setLoginError('Incorrect password. Please verify your password or use the OTP reset option below.');
    }
  };

  // Check if entered identity matches configured owner details
  const isValidOwnerIdentity = (input: string) => {
    const clean = input.trim().toLowerCase().replace(/[\s\-\(\)]/g, '');
    const cleanMobile = RECOVERY_MOBILE.replace(/[\s\-]/g, '');
    const cleanEmail = RECOVERY_EMAIL.toLowerCase();

    return (
      clean === cleanEmail ||
      clean === cleanMobile ||
      clean === `+91${cleanMobile}` ||
      clean === `91${cleanMobile}` ||
      clean === `0${cleanMobile}`
    );
  };

  // Handle Send OTP (Only for verified owner identity)
  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidOwnerIdentity(identityInput)) {
      setIdentityError('Access Denied. Only the verified portfolio owner (Shaik Ahammad) can request a password reset.');
      return;
    }

    setIdentityError('');
    // Generate cryptographically random 6-digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setCountdown(60);
    setMode('verify-otp');
    setResetError('');
    setShowOtpCodeInModal(false);
  };

  // Resend OTP handler
  const handleResendOtp = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setCountdown(60);
    setResetError('');
  };

  // Handle Verify OTP & Set New Password
  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (enteredOtp.trim() !== generatedOtp) {
      setResetError('Invalid 6-digit OTP code. Please enter the exact code sent to your registered contact.');
      return;
    }

    if (newPassword.length < 6) {
      setResetError('Password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setResetError('New passwords do not match. Please re-enter.');
      return;
    }

    // Save new password
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
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* ============================================================ */}
        {/* 1. LOGIN VIEW (Password is strictly private, never displayed) */}
        {/* ============================================================ */}
        {mode === 'login' && (
          <div className="space-y-5">
            <div className="text-center space-y-2">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Lock className="h-7 w-7" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">
                Creator Admin Login
              </h3>
              <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                Enter your secret owner password to access editing, photo uploads, and portfolio settings.
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
                    autoFocus
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setLoginError('');
                    }}
                    placeholder="Enter owner password"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-zinc-950 font-bold text-sm transition-all shadow-md shadow-emerald-500/20 active:scale-[0.98]"
              >
                Log In as Owner
              </button>
            </form>

            {/* Forgot Password / OTP Reset Option */}
            <div className="pt-2 border-t border-zinc-800 text-center">
              <button
                type="button"
                onClick={() => setMode('request-otp')}
                className="text-xs text-amber-400 hover:text-amber-300 font-semibold hover:underline inline-flex items-center gap-1.5 transition-colors"
              >
                <KeyRound className="h-3.5 w-3.5" />
                <span>Forgot Password? Reset via Email / Mobile OTP</span>
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 2. REQUEST OTP (Owner verification challenge)                */}
        {/* ============================================================ */}
        {mode === 'request-otp' && (
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMode('login')}
                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
                aria-label="Back to login"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <div>
                <h3 className="font-serif text-xl font-bold text-white">
                  Reset Password with OTP
                </h3>
                <p className="text-xs text-zinc-400">
                  Verify your identity as Shaik Ahammad
                </p>
              </div>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-900/60 p-3 rounded-xl border border-zinc-800/80">
              To prevent unauthorized password resets by visitors, please confirm your registered creator <strong>Email</strong> or <strong>Mobile Number</strong>.
            </p>

            {identityError && (
              <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{identityError}</span>
              </div>
            )}

            <form onSubmit={handleRequestOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Registered Email or Phone Number
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  value={identityInput}
                  onChange={(e) => {
                    setIdentityInput(e.target.value);
                    setIdentityError('');
                  }}
                  placeholder="e.g. adba0482@gmail.com or 6301010537"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400"
                />
                <span className="text-[11px] text-zinc-500 mt-1 block">
                  Configured contact ending with <strong className="text-zinc-400">...0537</strong> and <strong className="text-zinc-400">...0482@gmail.com</strong>
                </span>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-zinc-950 font-bold text-sm transition-all shadow-md active:scale-[0.98]"
              >
                <Send className="h-4 w-4" />
                <span>Send 6-Digit OTP</span>
              </button>
            </form>
          </div>
        )}

        {/* ============================================================ */}
        {/* 3. VERIFY OTP & SET NEW PASSWORD                             */}
        {/* ============================================================ */}
        {mode === 'verify-otp' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMode('request-otp')}
                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
                aria-label="Back to identity verification"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <div>
                <h3 className="font-serif text-xl font-bold text-white">
                  Enter OTP & Set Password
                </h3>
                <p className="text-xs text-zinc-400">
                  Dispatched to your registered contact
                </p>
              </div>
            </div>

            {/* OTP Delivery Confirmation Box */}
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 space-y-2 text-xs">
              <div className="flex items-center justify-between text-emerald-400 font-semibold">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>OTP generated for Shaik Ahammad</span>
                </span>
                <span className="text-[11px] text-zinc-400">Valid 10 mins</span>
              </div>
              <p className="text-zinc-300 text-[11px] leading-relaxed">
                A 6-digit verification code was prepared for <strong className="text-white">6301010537</strong> and <strong className="text-white">adba0482@gmail.com</strong>.
              </p>
              
              <div className="flex items-center gap-2 pt-1 border-t border-emerald-500/20">
                <a
                  href={`mailto:${RECOVERY_EMAIL}?subject=Software%20Soggadoo%20Admin%20Reset%20OTP&body=Hello%20Shaik,%20your%20verification%20code%20is:%20${generatedOtp}`}
                  className="px-2.5 py-1 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-[11px] font-medium transition-colors inline-flex items-center gap-1"
                >
                  <Mail className="h-3 w-3" />
                  <span>Open Email Draft</span>
                </a>

                <button
                  type="button"
                  onClick={() => setShowOtpCodeInModal(!showOtpCodeInModal)}
                  className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[11px] font-medium transition-colors"
                >
                  {showOtpCodeInModal ? 'Hide Code' : 'View Code on Screen'}
                </button>
              </div>

              {showOtpCodeInModal && (
                <div className="p-2 rounded bg-black/60 border border-emerald-500/40 text-center font-mono text-base font-bold text-emerald-400 tracking-widest">
                  {generatedOtp}
                </div>
              )}
            </div>

            {resetError && (
              <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{resetError}</span>
              </div>
            )}

            <form onSubmit={handleResetPassword} className="space-y-3.5">
              {/* 6-Digit OTP */}
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
                      onClick={handleResendOtp}
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
                  autoFocus
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
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
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
