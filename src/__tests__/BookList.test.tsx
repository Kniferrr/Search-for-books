import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import { Book } from "../types/types";
import BookList from "../components/BookList";

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
  useSelector: (
    selector: (arg0: {
      searchResultsSlice: {
        books: never[];
        totalItems: number;
        SearchValue: string;
        page: number;
      };
    }) => any
  ) =>
    selector({
      searchResultsSlice: {
        books: [],
        totalItems: 60,
        SearchValue: "",
        page: 0,
      },
    }),
}));

describe("BookList Component", () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it('dispatches the "onSearchMore" action when "Load More" button is clicked', () => {
    render(
      <Provider store={configureStore()({})}>
        <BookList />
      </Provider>
    );

    const loadMoreButton = screen.queryByText("Load More");
    if (loadMoreButton) {
      fireEvent.click(loadMoreButton);

      expect(mockDispatch).toHaveBeenCalledWith({
        type: "searchResultsSlice/AddSearchResults",
        payload: {
          items: new Array(30).fill(createMockBook()),
          totalItems: 60,
        },
      });
    }
  });

  function createMockBook(): Book {
    return {
      accessInfo: {
        accessViewStatus: "SAMPLE_ACCESS_VIEW_STATUS",
        country: "SAMPLE_COUNTRY",
        embeddable: true,
        epub: {
          isAvailable: true,
        },
        pdf: {
          isAvailable: true,
        },
        publicDomain: true,
        quoteSharingAllowed: true,
        textToSpeechPermission: "ALLOWED",
        viewability: "ALL_PAGES",
        webReaderLink: "sample-web-reader-link",
      },
      etag: "sample-etag",
      id: "sample-id",
      kind: "sample-kind",
      saleInfo: {
        country: "SAMPLE_SALE_COUNTRY",
        isEbook: true,
        saleability: "FOR_SALE",
      },
      selfLink: "sample-self-link",
      volumeInfo: {
        description: "Sample description",
        categories: ["Fiction", "Mystery"],
        imageLinks: {
          thumbnail: "sample-thumbnail.jpg",
        },
        allowAnonLogging: true,
        authors: ["Author 1", "Author 2"],
        canonicalVolumeLink: "sample-link",
        contentVersion: "1.0",
        industryIdentifiers: [
          { type: "ISBN_10", identifier: "1234567890" },
          { type: "ISBN_13", identifier: "9781234567890" },
        ],
        infoLink: "sample-info-link",
        language: "English",
        maturityRating: "MATURE",
        pageCount: 300,
        panelizationSummary: {
          containsEpubBubbles: false,
          containsImageBubbles: false,
        },
        previewLink: "sample-preview-link",
        printType: "BOOK",
        publishedDate: "2023-10-13",
        publisher: "Sample Publisher",
        readingModes: {
          image: true,
          text: true,
        },
        subtitle: "Sample Subtitle",
        title: "Sample Title",
      },
    };
  }
});
