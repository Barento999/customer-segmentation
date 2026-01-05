import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CustomerForm from "../../components/CustomerForm";

describe("CustomerForm", () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it("renders all form fields", () => {
    render(<CustomerForm onSubmit={mockOnSubmit} loading={false} />);

    expect(screen.getByLabelText(/sex/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/annual income/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/spending score/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/purchase frequency/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /predict segment/i })
    ).toBeInTheDocument();
  });

  it("displays validation errors for empty fields", async () => {
    const user = userEvent.setup();
    render(<CustomerForm onSubmit={mockOnSubmit} loading={false} />);

    const submitButton = screen.getByRole("button", {
      name: /predict segment/i,
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/age must be between 18 and 100/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/annual income must be positive/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/spending score must be between 1 and 100/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/purchase frequency must be positive/i)
      ).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("validates age range", async () => {
    const user = userEvent.setup();
    render(<CustomerForm onSubmit={mockOnSubmit} loading={false} />);

    const ageInput = screen.getByLabelText(/age/i);
    const submitButton = screen.getByRole("button", {
      name: /predict segment/i,
    });

    // Test age too low
    await user.type(ageInput, "15");
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/age must be between 18 and 100/i)
      ).toBeInTheDocument();
    });

    // Test age too high
    await user.clear(ageInput);
    await user.type(ageInput, "150");
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/age must be between 18 and 100/i)
      ).toBeInTheDocument();
    });
  });

  it("validates spending score range", async () => {
    const user = userEvent.setup();
    render(<CustomerForm onSubmit={mockOnSubmit} loading={false} />);

    const spendingInput = screen.getByLabelText(/spending score/i);
    const submitButton = screen.getByRole("button", {
      name: /predict segment/i,
    });

    // Test score too low
    await user.type(spendingInput, "0");
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/spending score must be between 1 and 100/i)
      ).toBeInTheDocument();
    });

    // Test score too high
    await user.clear(spendingInput);
    await user.type(spendingInput, "150");
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/spending score must be between 1 and 100/i)
      ).toBeInTheDocument();
    });
  });

  it("submits form with valid data", async () => {
    const user = userEvent.setup();
    render(<CustomerForm onSubmit={mockOnSubmit} loading={false} />);

    // Fill in all fields
    await user.selectOptions(screen.getByLabelText(/sex/i), "Male");
    await user.type(screen.getByLabelText(/age/i), "35");
    await user.type(screen.getByLabelText(/annual income/i), "65.5");
    await user.type(screen.getByLabelText(/spending score/i), "75");
    await user.type(screen.getByLabelText(/purchase frequency/i), "12");

    // Submit form
    await user.click(screen.getByRole("button", { name: /predict segment/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        sex: "Male",
        age: 35,
        annual_income: 65.5,
        spending_score: 75,
        purchase_frequency: 12,
      });
    });
  });

  it("clears error when user starts typing", async () => {
    const user = userEvent.setup();
    render(<CustomerForm onSubmit={mockOnSubmit} loading={false} />);

    const ageInput = screen.getByLabelText(/age/i);
    const submitButton = screen.getByRole("button", {
      name: /predict segment/i,
    });

    // Trigger validation error
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/age must be between 18 and 100/i)
      ).toBeInTheDocument();
    });

    // Start typing - error should clear
    await user.type(ageInput, "35");

    await waitFor(() => {
      expect(
        screen.queryByText(/age must be between 18 and 100/i)
      ).not.toBeInTheDocument();
    });
  });

  it("disables submit button when loading", () => {
    render(<CustomerForm onSubmit={mockOnSubmit} loading={true} />);

    const submitButton = screen.getByRole("button", { name: /analyzing/i });
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveClass("bg-gray-400", "cursor-not-allowed");
  });

  it("shows loading state with spinner", () => {
    render(<CustomerForm onSubmit={mockOnSubmit} loading={true} />);

    expect(screen.getByText(/analyzing/i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("allows selecting sex from dropdown", async () => {
    const user = userEvent.setup();
    render(<CustomerForm onSubmit={mockOnSubmit} loading={false} />);

    const sexSelect = screen.getByLabelText(/sex/i);

    await user.selectOptions(sexSelect, "Female");
    expect(sexSelect.value).toBe("Female");

    await user.selectOptions(sexSelect, "Male");
    expect(sexSelect.value).toBe("Male");
  });

  it("validates negative income", async () => {
    const user = userEvent.setup();
    render(<CustomerForm onSubmit={mockOnSubmit} loading={false} />);

    const incomeInput = screen.getByLabelText(/annual income/i);
    const submitButton = screen.getByRole("button", {
      name: /predict segment/i,
    });

    await user.type(incomeInput, "-10");
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/annual income must be positive/i)
      ).toBeInTheDocument();
    });
  });

  it("validates negative purchase frequency", async () => {
    const user = userEvent.setup();
    render(<CustomerForm onSubmit={mockOnSubmit} loading={false} />);

    const frequencyInput = screen.getByLabelText(/purchase frequency/i);
    const submitButton = screen.getByRole("button", {
      name: /predict segment/i,
    });

    await user.type(frequencyInput, "-5");
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/purchase frequency must be positive/i)
      ).toBeInTheDocument();
    });
  });
});
