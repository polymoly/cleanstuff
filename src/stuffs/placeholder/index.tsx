import { AvatarHolder } from "./avatar";
import { ButtonHolder } from "./button";
import { CupHolder } from "./cup";
import { ImageHolder } from "./image";
import { ParagraphHolder } from "./paragraph";
import useStyles from "./styles";
import {
  PlaceholderProps,
  WithAvatarProps,
  WithButtonProps,
  WithCupProps,
  WithImageProps,
  WithParagraphProps,
} from "./types";

const Placeholder = ({
  avatar,
  button,
  image,
  paragraph,
  cup,
  animation = false,
}: PlaceholderProps) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {button && (
        <ButtonHolder
          {...button}
          animation={animation}
          isShown={!paragraph && !avatar}
        />
      )}
      {image && (
        <ImageHolder
          {...image}
          animation={animation}
          isShown={!paragraph && !avatar && !button}
        />
      )}
      {cup && (
        <CupHolder
          {...cup}
          animation={animation}
          isShown={!paragraph && !avatar && !button && !image}
        />
      )}
      {avatar && <AvatarHolder {...avatar} animation={animation} />}
      {paragraph && <ParagraphHolder {...paragraph} animation={animation} />}
    </div>
  );
};

const Paragraph = ({ animation, ...paragraph }: WithParagraphProps) => {
  return <Placeholder animation={animation} paragraph={paragraph} />;
};
const Avatar = ({ animation, ...avatar }: WithAvatarProps) => {
  return <Placeholder animation={animation} avatar={avatar} />;
};

const Button = ({ animation, ...button }: WithButtonProps) => {
  return <Placeholder animation={animation} button={button} />;
};

const Image = ({ animation, ...image }: WithImageProps) => {
  return <Placeholder animation={animation} image={image} />;
};

const Cup = ({ animation, ...cup }: WithCupProps) => {
  return <Placeholder animation={animation} cup={cup} />;
};

Placeholder.Paragraph = Paragraph;
Placeholder.Avatar = Avatar;
Placeholder.Button = Button;
Placeholder.Image = Image;
Placeholder.Cup = Cup;

export { Placeholder };

export type { PlaceholderProps };
