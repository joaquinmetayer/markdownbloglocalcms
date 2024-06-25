import Link from "next/link";

const AdminPanel = () => {
  return (
    <>
      <p>
        <Link href="/admin/create-post">Create post</Link>
      </p>
      <p>
        <Link href="/admin/delete-post">Delete post</Link>
      </p>
      <p>
        <Link href="/admin/change-image">Hero image</Link>
      </p>
      <p>
        <Link href="/admin/edit-links">Edit links</Link>
      </p>
    </>
  );
};

export default AdminPanel;
