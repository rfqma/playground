import { Card, Overlay, Button, Text } from "@mantine/core";
import classes from "./ImageActionBanner.module.css";
import { IconArrowRight } from "@tabler/icons-react";

interface ImageActionBannerProps {
  shake_map: string;
  title: string;
  description: string;
  buttonText: string;
}

export function ImageActionBanner({
  shake_map,
  title,
  description,
  buttonText,
}: ImageActionBannerProps) {
  return (
    <Card
      radius="md"
      className={classes.card}
      style={{
        backgroundImage: `url(${shake_map})`,
      }}
    >
      <Overlay className={classes.overlay} opacity={0.55} zIndex={0} />

      <div className={classes.content}>
        <Text size="lg" fw={700} className={classes.title}>
          {title}
        </Text>

        <Text size="sm" className={classes.description}>
          {description}
        </Text>

        <Button
          className={classes.action}
          variant="white"
          color="dark"
          size="xs"
          component="a"
          href={shake_map}
          target="_blank"
          rightSection={<IconArrowRight size={14} />}
        >
          {buttonText}
        </Button>
      </div>
    </Card>
  );
}
