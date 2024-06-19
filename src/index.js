import { createRoot, StrictMode } from "@wordpress/element";
import { useSelect } from "@wordpress/data";
import apiFetch from "@wordpress/api-fetch";
import { store as coreDataStore } from "@wordpress/core-data"; // this acts as redux store we can save and select from

function StatusTrackerApp() {
  apiFetch({ path: "/wp/v2/posts" }).then((posts) => {
    console.log(posts);
  });

  // useSelect acts similar to a useEffect and can grab data out of redux store for us to use - also has familiar dependency array
  const { pages } = useSelect((select) => {
    return {
      pages: select(coreDataStore).getEntityRecords("postType", "page"),
    };
  }, []);

  console.log(pages);

  const authors = useSelect((select) => {
    return select("core").getUsers({ who: "authors" });
  }, []);

  console.log(authors);

  return (
    <div>
      <table className="wp-list-table widefat fixed striped table-view-list">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pages?.map((page) => (
            <tr key={page.id}>
              <td>{page.title.rendered}</td>
              <td></td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Load in our react app to the DOM
window.addEventListener(
  "load",
  function () {
    const rootElement = document.querySelector("#status-tracker");
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <StatusTrackerApp />
      </StrictMode>
    );
  },
  false
);
