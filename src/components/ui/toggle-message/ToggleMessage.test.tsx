import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ToggleMessage from "./ToggleMessage";
import { renderWithUser } from "../../../test/utils/setup-user-events";

const TEST_MESSAGE = "test message";

test("loads and displays greeting", async () => {
  // ARRANGE
  const { user } = renderWithUser(<ToggleMessage message={TEST_MESSAGE} />);

  // ACT
  const headingEl = await screen.findByRole("heading");
  expect(screen.getByRole("heading")).toHaveTextContent(TEST_MESSAGE);
  await user.click(screen.getByText("Vis/Skjul Melding"));
  expect(headingEl).not.toBeVisible();
});
