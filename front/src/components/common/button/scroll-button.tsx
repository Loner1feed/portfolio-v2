//styles
import { Button, ButtonProps } from './button';
import './button.style.scss';

export const ScrollButton: React.FC<ButtonProps> = props => {
  const scroll = () => {
    const el = document.querySelector('#scrollTo');

    el?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return <Button {...props} onClick={scroll} />;
};
