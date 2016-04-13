# React Photo Gallery Component

To get started, clone/download this repo (do not fork) and use it to create your own GitHub repo with this exact code on `master`. Commit your changes to a separate branch. When your code is ready to review, create a pull request on your own repo (do not merge) and mention @simpixelated. If you need help getting setup with Webpack, Babel, or ESLint, [read about the starter kit](https://github.com/simpixelated/react-es6-starter).

## Goal

Create a thumbnail gallery component in React that allows for removing photos from the set. Time permitting, allow sorting via drag and drop.

### Acceptance Criteria
* photos are displayed as thumbnails in a list or [grid view](http://www.material-ui.com/#/components/grid-list)
* clicking a thumbnail opens full size image in a new tab
* each thumbnail has a checkmark for selecting and a trash can icon for deleting
* can select multiple images and click a single button to delete from gallery
* deleting image(s) will prompt the user to confirm

#### Stretch Goals
* allow "read only" view to be set via props, which should hide icons and disable sorting
* images can be re-ordered
* **super stretch goal:** images can be re-ordered by drag and drop

#### Development Notes
* should use [Material-UI](http://www.material-ui.com/) components whenever possible
* the component should have 3 props:
  * `photos` which will be an array of photo objects
  * `editable` which will be true/false
  * `onChange` which will be a function
* changes can all be maintained in `state` and they do not need to persist on refresh, however the changed photo data should be exportable via the `onChange` callback
* `npm run lint` should pass
* this is not a test of your CSS or design skills
* component should handle zero to at least twenty photos (do not need to support hundreds or more)

Example usage:
```javascript
const photos = [
  _.map(_.range(0, 20), function (num) {
    return {
      fileUrl: 'http://loremflickr.com/640/4800?random=' + num
    };
  });
];

// example onChange handler for persisting photo changes
const handleChange = (data) => {
  saveDataToServer(data);
}

ReactDOM.render(
  <PhotoGallery photos={photos} editable={true} onChange={handleChange} />,
  document.getElementById('root')
);

```
