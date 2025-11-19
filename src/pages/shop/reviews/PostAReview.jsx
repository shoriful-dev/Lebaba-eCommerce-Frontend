import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchProductByIdQuery } from '../../../redux/features/products/productsApi';
import { usePostReviewMutation } from '../../../redux/features/reviews/reviewsApi';

const PostAReview = ({ handleClose, isModalOpen }) => {
  const {id} = useParams();
  const {user} = useSelector((state) => state.auth);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const {refetch} = useFetchProductByIdQuery(id, {
    skip: !id
  })
  const handleRatting = (value) => {
    setRating(value)
  }
  const [ postReview ] = usePostReviewMutation();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newReview = {
      comment: comment,
      rating: rating,
      userId: user?._id,
      productId: id,
    };
    if(!user) {
      alert('You must be logged in to post a review');
      navigate('/login')
      return;
    }
    try {
      const response = await postReview(newReview).unwrap();
      alert('Review Posted successfully!');
      setRating(0);
      setComment('');
      refetch();
    } catch (error) {
      alert('Error Posting review!', error)
    }
    handleClose();
  }
  return (
    <div
      className={`fixed inset-0 ${isModalOpen ? 'block' : 'hidden'} bg-black/90 flex items-center justify-center z-40 px-2`}
    >
      <div className="bg-white p-6 rounded-md shadow-lg w-96 z-50">
        <h2 className="text-lg font-bold mb-4">Post a Review</h2>

        <div className="flex items-center mb-4">
          {[1, 2, 3, 4, 5].map(star => (
            <span onClick={() => handleRatting(star)} key={star} className="cursor-pointer text-yellow-500 text-xl">
              {rating >= star ? (
                <i className="ri-star-fill"></i>
              ) : (
                <i className="ri-star-line"></i>
              )}
            </span>
          ))}
        </div>

        <textarea
          rows="4"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded-md mb-4"
          placeholder="Write your comment here..."
        />

        <div className="flex justify-end gap-2">
          <button onClick={handleClose} className="px-4 py-2 bg-gray-300 rounded-md flex items-center gap-2">
            <i className="ri-close-line"></i> Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-primary text-white rounded-md flex items-center gap-2"
          >
            <i className="ri-check-line"></i> Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostAReview;
