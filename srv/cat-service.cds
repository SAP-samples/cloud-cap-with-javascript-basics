using { sap.capire.bookshop as my } from '../db/schema';

@protocol: [
  'odata-v4',
  'graphql'
]
service CatalogService  @(requires: 'authenticated-user'){

  /** For displaying lists of Books */
  entity ListOfBooks as projection on Books
  excluding { descr };

  /** For display in details pages */
  entity Books as projection on my.Books { *,
    author.name as author
  } excluding { createdBy, modifiedBy };

  action submitOrder ( book: Books:ID, quantity: Integer ) returns { stock: Integer };
  event OrderedBook : { book: Books:ID; quantity: Integer; buyer: String };
}
