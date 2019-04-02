import React from "react";

export default function Icon({ name }: { name: string }) {
  return (
    <i
      title={name}
      role="img"
      data-testid="plain-icon"
      className={iconClassName(name)}
    />
  );
}

function iconClassName(iconName: string) {
  return `wi wi-${iconName}`;
}
