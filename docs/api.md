# Backend API

The API listens on port `4000` by default. Set `PORT` to override it. Stock
routes require a Firebase ID token in the `Authorization: Bearer <token>` header.

| Method | Path | Authentication | Purpose |
|---|---|---|---|
| `POST` | `/auth/register` | Public | Create a Firebase Authentication user |
| `GET` | `/stock` | Required | List stock owned by the authenticated user |
| `POST` | `/stock` | Required | Create a stock item for the authenticated user |
| `PUT` | `/stock/:id` | Required | Update an item owned by the authenticated user |

Stock requests validate item name, positive integer quantity, positive cost and
selling prices, and require the selling price to exceed the cost price. The
backend assigns ownership from the verified token rather than trusting a
client-supplied `ownerId`.

There is currently no health-check route or delete-stock route.
