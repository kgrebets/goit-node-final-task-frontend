import Icon from '../Icon';

export default function Footer() {
  const socialLinkClasses =
    'flex items-center justify-center p-2.5 rounded-full border border-tertiary text-primary transition-all duration-[250ms] ease-out hover:bg-primary hover:text-white hover:border-primary';

  return (
    <footer className="w-full mt-auto bg-white">
      <div className="flex justify-between items-center py-6 px-8">
        <span className="text-xl font-bold text-primary tracking-[-0.03125rem]">
          foodies
        </span>
        <div className="flex gap-3">
          <a
            href="https://www.facebook.com/goITclub/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className={socialLinkClasses}
          >
            <Icon name="facebook" size={20} />
          </a>
          <a
            href="https://www.instagram.com/goitclub/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className={socialLinkClasses}
          >
            <Icon name="instagram" size={20} />
          </a>
          <a
            href="https://www.youtube.com/c/GoIT"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className={socialLinkClasses}
          >
            <Icon name="youtube" size={20} />
          </a>
        </div>
      </div>
      <div className="h-px bg-tertiary"></div>
      <div className="py-5 px-8 text-center">
        <p className="m-0 text-base text-secondary max-[375px]:text-sm">
          @2024, Foodies. All rights reserved
        </p>
      </div>
    </footer>
  );
}
