import Mind from "../page";

export default function Folder({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div>
      <Mind folderId={id} />
    </div>
  );
}
