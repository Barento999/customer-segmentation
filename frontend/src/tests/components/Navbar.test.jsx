import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../../components/Navbar";

describe("Navbar", () => {
  const renderNavbar = () => {
    return render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
  };

  it("renders the logo and brand name", () => {
    renderNavbar();
    expect(screen.getByText(/customer segmentation ai/i)).toBeInTheDocument();
  });

  it("renders all navigation links", () => {
    renderNavbar();

    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /dashboard/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /history/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /about/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /documentation/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /settings/i })).toBeInTheDocument();
  });

  it("has correct href attributes for navigation links", () => {
    renderNavbar();

    expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute(
      "href",
      "/"
    );
    expect(screen.getByRole("link", { name: /dashboard/i })).toHaveAttribute(
      "href",
      "/dashboard"
    );
    expect(screen.getByRole("link", { name: /history/i })).toHaveAttribute(
      "href",
      "/history"
    );
    expect(screen.getByRole("link", { name: /about/i })).toHaveAttribute(
      "href",
      "/about"
    );
    expect(
      screen.getByRole("link", { name: /documentation/i })
    ).toHaveAttribute("href", "/documentation");
    expect(screen.getByRole("link", { name: /settings/i })).toHaveAttribute(
      "href",
      "/settings"
    );
  });

  it("renders mobile menu button", () => {
    renderNavbar();

    // Mobile menu button should be present
    const menuButtons = screen.getAllByRole("button");
    expect(menuButtons.length).toBeGreaterThan(0);
  });
});
