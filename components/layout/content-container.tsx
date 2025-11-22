import type React from "react";
import { Container } from "@mantine/core";

interface ContentContainerProps {
  children: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export function ContentContainer({
  children,
  size = "xl",
}: ContentContainerProps) {
  return (
    <Container size={size} px={0}>
      {children}
    </Container>
  );
}
