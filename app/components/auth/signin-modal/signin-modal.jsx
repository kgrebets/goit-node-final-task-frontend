import { useState } from 'react';
import clsx from 'clsx';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Modal from '../../modal';
import { useLogin } from '../../../features/auth/hooks.js';
import EyeIcon from '../../icons/eye.jsx';
import EyeOffIcon from '../../icons/eye-off.jsx';

const signInSchema = Yup.object({
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export default function SignInModal({ isOpen, onClose, onSwitchToSignUp }) {
  const [localError, setLocalError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLogin();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: signInSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLocalError('');
      try {
        await loginMutation.mutateAsync(values);
        onClose?.();
      } catch (error) {
        setLocalError(error?.message || 'Failed to sign in.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleSwitch = () => {
    if (onSwitchToSignUp) onSwitchToSignUp();
  };

  const passwordType = showPassword ? 'text' : 'password';

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-6">
        <h2 className="text-2xl font-extrabold uppercase tracking-[-0.02em]">
          Sign in
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-5" noValidate>
          <div className="space-y-1">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email*"
              className="w-full rounded-full"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-xs text-red-500">{formik.errors.email}</p>
            )}
          </div>

          <div className="space-y-1">
            <div className="relative">
              <input
                id="password"
                name="password"
                type={passwordType}
                placeholder="Password"
                className="w-full rounded-full pr-10"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center border-0 bg-transparent p-0 text-gray-500 hover:text-gray-800"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeIcon width={20} height={20} />
                ) : (
                  <EyeOffIcon width={20} height={20} />
                )}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-xs text-red-500">{formik.errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={formik.isSubmitting || loginMutation.isPending}
            className={clsx(
              'mt-8 flex w-full items-center justify-center rounded-full border-0 py-3 text-sm font-bold uppercase tracking-[-0.02em] text-white disabled:opacity-70',
              formik.isValid && formik.dirty
                ? 'bg-black'
                : 'bg-gray-300 cursor-not-allowed'
            )}
          >
            {formik.isSubmitting || loginMutation.isPending
              ? 'Signing in...'
              : 'Sign in'}
          </button>

          {localError && (
            <p className="text-xs text-red-500 text-center">{localError}</p>
          )}
        </form>

        <p className="w-full text-center text-[12px] leading-[18px] text-gray-500">
          <span>Don&apos;t have an account? </span>
          <span
            onClick={handleSwitch}
            className="cursor-pointer font-semibold text-gray-900 hover:opacity-80"
          >
            Create an account
          </span>
        </p>
      </div>
    </Modal>
  );
}
