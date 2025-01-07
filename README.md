# Volto 3D Addon

The **Volto 3D Addon** is a powerful extension for Volto, designed to integrate 3D objects (e.g., STL files) and 360° photos into pages. This addon makes 3D content accessible and interactive for users by providing a dedicated block and rendering capabilities.

## Features

- **STL File Upload:**
  - Users can upload STL files directly to Volto.

- **3D Object Block:**
  - A new Volto block specifically for inserting 3D objects into pages.
  - Supports rendering of STL files.

- **Rendering Engine Integration:**
  - Includes a suitable rendering engine for displaying STL files.
  - Ensures consistency with other file views available in Volto.

- **Customization Options:**
  - Allows customization of the 3D object display in terms of rotation and size.
  - Default zoom level ensures objects are both fully visible and easily recognizable (e.g., min. 50%, max. 100%).

- **360° Image Support:**
  - Preliminary evaluation for supporting 360° images using H5P.

## Installation

To install the addon, run the following command in your Volto project directory:

```bash
npm install volto-3d-addon
```

After installation, update your `addons` configuration in `config.js`:

```javascript
const config = {
  ...,
  addons: [
    ...,
    'volto-3d-addon',
  ],
};

export default config;
```

## Usage

1. **Upload STL Files:**
   - Navigate to the content management interface.
   - Upload STL files as you would any other file type.

2. **Add 3D Object Block:**
   - Edit a page in Volto.
   - Add the "3D Object" block from the block selector menu.
   - Select an uploaded STL file to display.

3. **Customize Display:**
   - Adjust rotation and size directly within the block editor.
   - View the object with a default zoom level for optimal recognition.

## Development

### Requirements
- Node.js (LTS version recommended)
- Volto project setup

### Running Locally
1. Clone this repository:
   ```bash
   git clone https://github.com/your-organization/volto-3d-addon.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Link the addon to your Volto project:
   ```bash
   cd ../your-volto-project
   npm link ../volto-3d-addon
   npm start
   ```

### Testing
Run tests to ensure everything works as expected:

```bash
npm test
```

## Roadmap

- Improve rendering performance for larger STL files.
- Expand support for additional 3D file formats.
- Finalize integration with H5P for 360° image support.

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
