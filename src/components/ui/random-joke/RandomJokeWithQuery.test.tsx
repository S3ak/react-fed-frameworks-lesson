import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import RandomJokeWithQuery from "./RandomJokeWithQuery";
import { renderWithUser } from "../../../test/utils/setup-user-events";

describe("Intergration | HOC | RandomJokeWithQuery", () => {
  it("displays a joke", async () => {
    renderWithUser(<RandomJokeWithQuery />);
    const heading = await screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
  });
});
