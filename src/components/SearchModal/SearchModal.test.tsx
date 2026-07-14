import { describe, it, expect, vi, afterEach, beforeEach} from "vitest"
import { renderWithProviders } from "../../testUtils/renderWithProviders";
import { screen } from "@testing-library/react";
import { SearchModal } from "./SearchModal";

describe("SearchModal", () => {
    it("should render without issues", () => {
        renderWithProviders(<SearchModal />);
        expect(document.querySelector(".ReactModalPortal")).toBeInTheDocument();
    });
});