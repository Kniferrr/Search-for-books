export interface Book {
  accessInfo: {
    accessViewStatus: string;
    country: string;
    embeddable: boolean;
    epub: {
      isAvailable: boolean;
    };
    pdf: {
      isAvailable: boolean;
    };
    publicDomain: boolean;
    quoteSharingAllowed: boolean;
    textToSpeechPermission: string;
    viewability: string;
    webReaderLink: string;
  };
  etag: string;
  id: string;
  kind: string;
  saleInfo: {
    country: string;
    isEbook: boolean;
    saleability: string;
  };
  selfLink: string;
  volumeInfo: {
    description: string;
    categories: any;
    imageLinks: any;
    allowAnonLogging: boolean;
    authors: string[];
    canonicalVolumeLink: string;
    contentVersion: string;
    industryIdentifiers: {
      type: string;
      identifier: string;
    }[];
    infoLink: string;
    language: string;
    maturityRating: string;
    pageCount: number;
    panelizationSummary: {
      containsEpubBubbles: boolean;
      containsImageBubbles: boolean;
    };
    previewLink: string;
    printType: string;
    publishedDate: string;
    publisher: string;
    readingModes: {
      image: boolean;
      text: boolean;
    };
    subtitle: string;
    title: string;
  };
}

export interface SearchResultsData {
  items: Book[];
  totalItems: number;
}
