import { render, screen } from "@testing-library/react";
import React from "react";
import { Card, CardDescription, CardTitle } from "./Card";

describe("Card", () => {
  it("renders title and description", () => {
    render(
      <Card>
        <CardTitle>Title</CardTitle>
        <CardDescription>Description</CardDescription>
      </Card>
    );

    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
  });
});
