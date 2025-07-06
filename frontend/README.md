# Payments App Frontend

This is the frontend application for the Payments App. It provides a user interface for managing accounts, performing transactions, and viewing user information. The frontend is built using React(vite) and Tailwind CSS.

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
VITE_BASE_URL=your_backend_api_url
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
- **Description:** The landing page of the application which will take the user to either signup page or dashboard page depending on if they are logged in or not.
- **Components Used:**
  - \`Landing\`
 
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
- **Description:** Displays the user's balance, user information, update details and the list of users to whom the current user can transfer the money to.

### Send Money

- **Path:** \`/send\`
- **Description:** Allows the user to send money to another user.

### Update

- **Path:** \`/update\`
- **Description:** Allows the user to update their details, it could be either one, two or all of the given options.
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
