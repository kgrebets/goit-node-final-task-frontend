import { useState } from 'react';
import clsx from 'clsx';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Modal from '../../modal';
import { useLogin, useRegister } from '../../../features/auth/hooks.js';
import EyeIcon from '../../icons/eye.jsx';
import EyeOffIcon from '../../icons/eye-off.jsx';

const signUpSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export default function SignUpModal({ isOpen, onClose, onSwitchToSignIn }) {
  const [localError, setLocalError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const registerMutation = useRegister();
  const loginMutation = useLogin();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: signUpSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLocalError('');
      const payload = {
        username: values.name.trim(),
        email: values.email.trim(),
        password: values.password,
      };
      try {
        await registerMutation.mutateAsync(payload);
        await loginMutation.mutateAsync({
          email: payload.email,
          password: payload.password,
        });
        onClose?.();
      } catch (error) {
        setLocalError(error?.message || 'Failed to sign up.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleSwitch = () => {
    if (onSwitchToSignIn) onSwitchToSignIn();
  };

  const isSubmitting =
    formik.isSubmitting ||
    registerMutation.isPending ||
    loginMutation.isPending;

  const passwordType = showPassword ? 'text' : 'password';

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-6">
        <h2 className="text-2xl font-extrabold uppercase tracking-[-0.02em]">
          Sign up
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-5" noValidate>
          <div className="space-y-1">
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Name*"
              className="w-full rounded-full"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-xs text-red-500">{formik.errors.name}</p>
            )}
          </div>

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
            disabled={isSubmitting}
            className={clsx(
              'mt-8 flex w-full items-center justify-center rounded-full border-0 py-3 text-sm font-bold uppercase tracking-[-0.02em] text-white disabled:opacity-70',
              formik.isValid && formik.dirty
                ? 'bg-black'
                : 'bg-gray-300 cursor-not-allowed'
            )}
          >
            {isSubmitting ? 'Creating...' : 'Create'}
          </button>

          {localError && (
            <p className="text-xs text-red-500 text-center">{localError}</p>
          )}
        </form>

        <p className="w-full text-center text-[12px] leading-[18px] text-gray-500">
          <span>I already have an account? </span>
          <span
            onClick={handleSwitch}
            className="cursor-pointer font-semibold text-gray-900 hover:opacity-80"
          >
            Sign in
          </span>
        </p>
      </div>
    </Modal>
  );
}
