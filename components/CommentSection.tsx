"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import '../styles/comment-section.css';
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

interface User {
    image: { png: string; webp: string };
    username: string;
}

interface CommentType {
    id: number;
    parent: number;
    content: string;
    createdAt: string;
    score: number;
    user: User;
    replyingTo?: string;
    replies: CommentType[];
}

interface CommentSectionProps {
    placeId: string;
}

export default function CommentSection({ placeId }: CommentSectionProps) {
    const [comments, setComments] = useState<CommentType[]>([]);
    const [newComment, setNewComment] = useState("");
    const [newRating, setNewRating] = useState(0);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editContent, setEditContent] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [deleteParentId, setDeleteParentId] = useState<number | null>(null);

    const user = useUser();
    const supabase = useSupabaseClient();

    const currentUser = {
        image: { png: user?.image || "/images/avatars/default.png", webp: user?.image || "/images/avatars/default.webp" },
        username: user?.name || user?.email || "Anonymous",
    };

    useEffect(() => {
        async function fetchReviews() {
            const { data, error } = await supabase
                .from("Review")
                .select("*, user(name, image)")
                .eq("placeId", placeId)
                .order("createdAt", { ascending: false });

            if (error) {
                console.error("Error fetching reviews:", error);
                return;
            }

            const mappedComments: CommentType[] = data.map((r) => ({
                id: r.id,
                parent: 0,
                content: r.comment || "",
                createdAt: new Date(r.createdAt).toLocaleDateString(), // Simple date, can improve to time ago
                score: r.rating,
                user: {
                    image: { png: r.user.image || "/default.png", webp: r.user.image || "/default.webp" },
                    username: r.user.name || "Anonymous",
                },
                replies: [],
            }));

            setComments(mappedComments);
        }

        fetchReviews();
    }, [placeId, supabase]);

    const updateComments = (
        list: CommentType[],
        id: number | null,
        parentId: number | null,
        updater: (c: CommentType) => CommentType | null
    ): CommentType[] => {
        return list
            .map((c) => {
                if (c.id === id && parentId === null) {
                    return updater(c);
                }
                if (c.replies?.length) {
                    return { ...c, replies: updateComments(c.replies, id, parentId, updater).filter(Boolean) as CommentType[] };
                }
                return c;
            })
            .filter(Boolean) as CommentType[];
    };

    const nextId = () => Math.max(0, ...comments.flatMap((c) => [c.id, ...c.replies.map((r) => r.id)])) + 1;

    const handleAddComment = async () => {
        if (newRating < 1 || newRating > 5) {
            alert("Please select a rating between 1 and 5.");
            return;
        }
        if (!user) {
            alert("Please log in to add a review.");
            return;
        }

        const { data, error } = await supabase.from("Review").insert({
            rating: newRating,
            comment: newComment.trim() || null,
            userId: user.id,
            placeId,
        }).select("*, user(name, image)").single();

        if (error) {
            alert("Failed to add review: " + error.message);
            return;
        }

        const newReview: CommentType = {
            id: data.id,
            parent: 0,
            content: data.comment || "",
            createdAt: new Date(data.createdAt).toLocaleDateString(),
            score: data.rating,
            user: {
                image: { png: data.user.image || "/default.png", webp: data.user.image || "/default.webp" },
                username: data.user.name || "Anonymous",
            },
            replies: [],
        };

        setComments((prev) => [...prev, newReview]);
        setNewComment("");
        setNewRating(0);
    };

    const handleEditComment = async (id: number, parentId: number | null) => {
        const { error } = await supabase.from("Review").update({ comment: editContent }).eq("id", id);

        if (error) {
            alert("Failed to edit review: " + error.message);
            return;
        }

        setComments((prev) =>
            updateComments(prev, id, parentId, (comment) => {
                comment.content = editContent;
                return comment;
            })
        );
        setEditingId(null);
        setEditContent("");
    };

    const handleDeleteComment = async () => {
        const { error } = await supabase.from("Review").delete().eq("id", deleteId);

        if (error) {
            alert("Failed to delete review: " + error.message);
            return;
        }

        setComments((prev) => updateComments(prev, deleteId, deleteParentId, () => null));
        setModalOpen(false);
        setDeleteId(null);
        setDeleteParentId(null);
    };

    const openDeleteModal = (id: number, parentId: number | null) => {
        setDeleteId(id);
        setDeleteParentId(parentId);
        setModalOpen(true);
    };

    const CommentNode = (comment: CommentType, parentId: number | null = null) => {
        const isCurrentUser = comment.user.username === currentUser.username;
        const isEditing = editingId === comment.id;

        return (
            <div className="comment-wrp" key={comment.id}>
                <div className={`comment container ${isCurrentUser ? "this-user border-2 border-mtoko-primary/20" : ""}`}>


                    <div className="c-user flex items-center gap-2">
                        <img src={comment.user.image.png} alt={comment.user.username} className="usr-img w-6 h-6 md:w-8 md:h-8 rounded-full" />
                        <p className="usr-name font-medium text-sm text-dark-blue">{comment.user.username}</p>
                        {isCurrentUser && <span className="bg-moderate-blue text-white px-1.5 py-0.5 text-xs font-normal rounded-sm">you</span>}
                        <p className="cmnt-at text-grayish-blue text-sm">{comment.createdAt}</p>
                    </div>

                    <div className="c-controls flex gap-4 items-center">
                        {isCurrentUser && (
                            <>
                                <a className="delete text-soft-red font-medium text-sm flex items-center gap-1 hover:text-mtoko-primary" onClick={() => openDeleteModal(comment.id, parentId)}>
                                    <FontAwesomeIcon className="control-icon fa-icon text-[14px]" icon={faTrash} />
                                    Delete
                                </a>
                                <a
                                    className="edit text-moderate-blue font-medium text-sm flex items-center gap-1 hover:text-mtoko-primary"
                                    onClick={() => {
                                        setEditingId(comment.id);
                                        setEditContent(comment.content);
                                    }}
                                >
                                    <FontAwesomeIcon className="control-icon fa-icon text-[14px]" icon={faEdit} />
                                    Edit
                                </a>
                            </>
                        )}
                    </div>

                    <p className="c-text text-grayish-blue text-sm leading-6 word-break-break-word">
                        {comment.replyingTo && <span className="reply-to text-moderate-blue font-medium">@{comment.replyingTo} </span>}
                        {isEditing ? (
                            <textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                className="cmnt-input border border-light-gray rounded p-2 resize-none h-24 w-full focus:border-2 focus:border-mtoko-primary"
                            />
                        ) : (
                            comment.content
                        )}
                    </p>

                    <div className="flex items-center gap-1 text-sm">
                        Rating: {comment.score} ⭐
                    </div>

                    {isEditing && (
                        <button
                            className="bu-primary bg-moderate-blue text-white font-medium text-sm px-4 py-2 rounded hover:bg-mtoko-primary"
                            onClick={() => handleEditComment(comment.id, parentId)}
                        >
                            Update
                        </button>
                    )}
                </div>

                <div className="replies comments-wrp mt-4 ml-4 md:ml-8 pl-4 border-l-2 border-light-gray">
                    {comment.replies?.map((reply) => CommentNode(reply, comment.id))}
                </div>
            </div>
        );
    };

    return (
        <div className="comment-section max-w-[90vw] sm:max-w-[75ch] mx-auto mt-20 mb-15 px-5 bg-very-light-gray font-['Rubik',_'Roboto',_sans-serif] z-10 flex flex-col h-[70vh]">
            <h2 className="text-2xl font-bold mb-4 text-dark-blue">Reviews</h2>
            <div className="comments-wrp flex flex-col overflow-y-auto flex-1">
                {comments.map((c) => CommentNode(c))}
            </div>

            <div className="reply-input container bg-white rounded-lg p-4 md:p-6 mt-4 grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-2 md:gap-4">
                <img src={currentUser.image.png} alt="Your avatar" className="usr-img w-6 h-6 md:w-8 md:h-8 rounded-full" />
                <div className="flex flex-col gap-2">
                    <select
                        value={newRating}
                        onChange={(e) => setNewRating(parseInt(e.target.value))}
                        className="border border-light-gray rounded p-2 w-24"
                    >
                        <option value={0}>Rating</option>
                        <option value={1}>1 ⭐</option>
                        <option value={2}>2 ⭐</option>
                        <option value={3}>3 ⭐</option>
                        <option value={4}>4 ⭐</option>
                        <option value={5}>5 ⭐</option>
                    </select>
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="cmnt-input border border-light-gray rounded p-2 resize-none h-24 focus:border-2 focus:border-mtoko-primary"
                        placeholder="Add a review..."
                    />
                </div>
                <button className="bu-primary bg-moderate-blue text-white font-medium text-sm px-4 py-2 rounded hover:bg-mtoko-primary" onClick={handleAddComment}>
                    SEND
                </button>
            </div>

            {modalOpen && (
                <div className="modal-wrp fixed inset-0 flex items-center justify-center bg-black/30 z-50">
                    <div className="modal container bg-white p-6 max-w-[90vw] sm:max-w-[32ch] rounded-lg grid gap-4">
                        <h3 className="text-dark-blue text-lg font-bold">Delete review</h3>
                        <p className="text-grayish-blue leading-6">Are you sure you want to delete this review? This will remove the review and can’t be undone.</p>
                        <button className="yes bg-soft-red text-white font-medium px-4 py-2 rounded hover:bg-mtoko-primary" onClick={handleDeleteComment}>
                            YES, DELETE
                        </button>
                        <button className="no bg-grayish-blue text-white font-medium px-4 py-2 rounded hover:bg-mtoko-primary" onClick={() => setModalOpen(false)}>
                            NO, CANCEL
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}