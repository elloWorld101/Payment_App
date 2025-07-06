# Payment App Frontend

This is the frontend application for the Payment App. It provides a user interface for managing accounts, performing transactions, and viewing user information. The frontend is built using React(vite) and Tailwind CSS.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/elloWorld101/Payment_App
   cd Payment_App/frontend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

### Configuration

Create a `.env` file in the root directory and add the necessary environment variables:

```plaintext
VITE_BACKEND_URL=your_backend_api_url
```

### Running the App

To start the development server, use the following command:

```bash
npm run dev
```

The app will be running on \`http://localhost:5173/`.

## Pages

### Landing

- **Path:** \`/\`
- **Description:** The landing page of the application, it navigates user to either signup page or the dashboard page depending on whether they are logged in or not

### Signup

- **Path:** \`/signup\`
- **Description:** Allows the user to create a new account.
- **Components Used:**
  - \`Header\`
  - \`InputBox\`
  - \`Footer\`

### Signin

- **Path:** \`/signin\`
- **Description:** Allows the user to sign in to their account.
- **Components Used:**
  - \`Header\`
  - \`InputBox\`
  - \`Footer\`

### Dashboard

- **Path:** \`/dashboard\`
- **Description:** Displays the user's balance, user information, allows the user to update their detail and displays the list of users to whom the current user can transfer money to.

### Send Money

- **Path:** \`/send\`
- **Description:** Allows the user to send money to another user.

### Update

- **Path:** \`/update\`
- **Description:** Allows the user to update their credentials.
- **Components Used:**
  - \`Header\`
  - \`InputBox\`

## Components

The frontend application uses a variety of reusable components, including:

- \`Header\`
- \`InputBox\`
- \`Footer\`
  
## Contributing

Feel free to open issues or submit pull requests if you have any suggestions or improvements.

## License

This project is licensed under the MIT License.
