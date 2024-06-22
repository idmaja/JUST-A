import React, { useState } from 'react';

const EditCommentModal = ({ comment, onClose, anime_mal_id }) => {
  const [newComment, setNewComment] = useState(comment.comment);

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/v1/comment/${comment.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ comment: newComment })
      });

      if (response.ok) {
        onClose();
      } else {
        console.error("Failed to edit comment.");
      }
    } catch (error) {
      console.error("Error while editing comment:", error);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div className="p-6 bg-white rounded shadow-lg">
        <h2 className="mb-4 text-xl font-bold">Edit Comment</h2>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-700">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-700">Save</button>
        </div>
      </div>
    </div>
  );
}

export default EditCommentModal;
