"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply, faEdit, faTrash, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import '../styles/comment-section.css';

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

const initialData = {
    currentUser: {
        image: { png: "/images/avatars/image-juliusomo.png", webp: "/images/avatars/image-juliusomo.webp" },
        username: "juliusomo",
    },
    comments: [
        {
            id: 1,
            parent: 0,
            content:
                "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
            createdAt: "1 month ago",
            score: 12,
            user: {
                image: { png: "/images/avatars/image-amyrobson.png", webp: "/images/avatars/image-amyrobson.webp" },
                username: "amyrobson",
            },
            replies: [],
        },
        {
            id: 2,
            parent: 0,
            content:
                "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
            createdAt: "2 weeks ago",
            score: 5,
            user: {
                image: { png: "/images/avatars/image-maxblagun.png", webp: "/images/avatars/image-maxblagun.webp" },
                username: "maxblagun",
            },
            replies: [
                {
                    id: 3,
                    parent: 2,
                    content:
                        "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
                    createdAt: "1 week ago",
                    score: 4,
                    replyingTo: "maxblagun",
                    user: {
                        image: { png: "/images/avatars/image-ramsesmiron.png", webp: "/images/avatars/image-ramsesmiron.webp" },
                        username: "ramsesmiron",
                    },
                    replies: [],
                },
                {
                    id: 4,
                    parent: 2,
                    content:
                        "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
                    createdAt: "2 days ago",
                    score: 2,
                    replyingTo: "ramsesmiron",
                    user: {
                        image: { png: "/images/avatars/image-juliusomo.png", webp: "/images/avatars/image-juliusomo.webp" },
                        username: "juliusomo",
                    },
                    replies: [],
                },
            ],
        },
    ],
};

export default function CommentSection() {
    const [comments, setComments] = useState<CommentType[]>(initialData.comments);
    const [newComment, setNewComment] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editContent, setEditContent] = useState("");
    const [replyingTo, setReplyingTo] = useState<number | null>(null);
    const [replyInputs, setReplyInputs] = useState<{ [key: number]: string }>({});
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [deleteParentId, setDeleteParentId] = useState<number | null>(null);

    const currentUser = initialData.currentUser;

    // Optimized updateComments to prevent duplicate replies
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
                if (c.id === parentId) {
                    const updatedComment = { ...c, replies: [...c.replies] };
                    const result = updater(updatedComment);
                    return result ? { ...result, replies: updateComments(c.replies, id, null, updater) } : null;
                }
                if (c.replies?.length) {
                    return { ...c, replies: updateComments(c.replies, id, parentId, updater).filter(Boolean) as CommentType[] };
                }
                return c;
            })
            .filter(Boolean) as CommentType[];
    };

    const nextId = () =>
        Math.max(
            0,
            ...comments.flatMap((c) => [c.id, ...c.replies.map((r) => r.id)])
        ) + 1;

    const handleAddComment = () => {
        if (!newComment.trim()) return;
        const c: CommentType = {
            id: nextId(),
            parent: 0,
            content: newComment.trim(),
            createdAt: "just now",
            score: 0,
            user: currentUser,
            replies: [],
        };
        setComments((prev) => [...prev, c]);
        setNewComment("");
    };

    const handleAddReply = (parentId: number, replyingToUser?: string) => {
        const text = replyInputs[parentId]?.trim();
        if (!text) return;

        const r: CommentType = {
            id: nextId(),
            parent: parentId,
            content: text,
            createdAt: "just now",
            score: 0,
            replyingTo: replyingToUser,
            user: currentUser,
            replies: [],
        };

        setComments((prev) =>
            updateComments(prev, parentId, null, (comment) => {
                if (!comment.replies.some(reply => reply.content === r.content && reply.createdAt === r.createdAt)) {
                    return { ...comment, replies: [...comment.replies, r] };
                }
                return comment;
            })
        );

        setReplyInputs((prev) => ({ ...prev, [parentId]: "" }));
        setReplyingTo(null);
    };

    const handleEditComment = (id: number, parentId: number | null) => {
        setComments((prev) =>
            updateComments(prev, id, parentId, (comment) => {
                comment.content = editContent;
                return comment;
            })
        );
        setEditingId(null);
        setEditContent("");
    };

    const handleDeleteComment = () => {
        setComments((prev) => updateComments(prev, deleteId, deleteParentId, () => null));
        setModalOpen(false);
        setDeleteId(null);
        setDeleteParentId(null);
    };

    const handleScoreChange = (id: number, parentId: number | null, delta: number) => {
        setComments((prev) =>
            updateComments(prev, id, parentId, (comment) => {
                comment.score = Math.max(0, comment.score + delta);
                return comment;
            })
        );
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
                    <div className="c-score">
                        <button onClick={() => handleScoreChange(comment.id, parentId, 1)} className="score-control">
                            <FontAwesomeIcon icon={faPlus} className="fa-icon text-[14px] text-grayish-blue hover:text-mtoko-primary" />
                        </button>
                        <p className="score-number text-moderate-blue font-medium text-sm">{comment.score}</p>
                        <button onClick={() => handleScoreChange(comment.id, parentId, -1)} className="score-control">
                            <FontAwesomeIcon icon={faMinus} className="fa-icon text-[14px] text-grayish-blue hover:text-mtoko-primary" />
                        </button>
                    </div>

                    <div className="c-user flex items-center gap-2">
                        <img src={comment.user.image.png} alt={comment.user.username} className="usr-img w-6 h-6 md:w-8 md:h-8 rounded-full" />
                        <p className="usr-name font-medium text-sm text-dark-blue">{comment.user.username}</p>
                        {isCurrentUser && <span className="bg-moderate-blue text-white px-1.5 py-0.5 text-xs font-normal rounded-sm">you</span>}
                        <p className="cmnt-at text-grayish-blue text-sm">{comment.createdAt}</p>
                    </div>

                    <div className="c-controls flex gap-4 items-center">
                        {isCurrentUser ? (
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
                        ) : (
                            <a className="reply text-moderate-blue font-medium text-sm flex items-center gap-1 hover:text-mtoko-primary" onClick={() => setReplyingTo(comment.id)}>
                                <FontAwesomeIcon className="control-icon fa-icon text-[14px]" icon={faReply} />
                                Reply
                            </a>
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
                    {replyingTo === comment.id && (
                        <div className="reply-input container grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-2 md:gap-4 mt-4 w-full max-w-full">
                            <img src={currentUser.image.png} alt="Your avatar" className="usr-img w-6 h-6 md:w-8 md:h-8 rounded-full" />
                            <textarea
                                value={replyInputs[comment.id] || ""}
                                onChange={(e) =>
                                    setReplyInputs((prev) => ({ ...prev, [comment.id]: e.target.value }))
                                }
                                className="cmnt-input border border-light-gray rounded p-2 resize-none h-24 focus:border-2 focus:border-mtoko-primary"
                                placeholder="Add a reply..."
                            />
                            <button
                                className="bu-primary bg-moderate-blue text-white font-medium text-sm px-4 py-2 rounded hover:bg-mtoko-primary"
                                onClick={() => handleAddReply(comment.id, comment.user.username)}
                            >
                                Reply
                            </button>
                        </div>
                    )}

                    {comment.replies?.map((reply) => CommentNode(reply, comment.id))}
                </div>
            </div>
        );
    };

    return (
        <div className="comment-section max-w-[90vw] sm:max-w-[75ch] mx-auto mt-20 mb-15 px-5 bg-very-light-gray font-['Rubik',_'Roboto',_sans-serif] z-10">
            <div className="comments-wrp flex flex-col">
                {comments.map((c) => CommentNode(c))}
            </div>

            <div className="reply-input container bg-white rounded-lg p-4 md:p-6 mt-4 grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-2 md:gap-4">
                <img src={currentUser.image.png} alt="Your avatar" className="usr-img w-6 h-6 md:w-8 md:h-8 rounded-full" />
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="cmnt-input border border-light-gray rounded p-2 resize-none h-24 focus:border-2 focus:border-mtoko-primary"
                    placeholder="Add a comment..."
                />
                <button className="bu-primary bg-moderate-blue text-white font-medium text-sm px-4 py-2 rounded hover:bg-mtoko-primary" onClick={handleAddComment}>
                    SEND
                </button>
            </div>

            {modalOpen && (
                <div className="modal-wrp fixed inset-0 flex items-center justify-center bg-black/30 z-50">
                    <div className="modal container bg-white p-6 max-w-[90vw] sm:max-w-[32ch] rounded-lg grid gap-4">
                        <h3 className="text-dark-blue text-lg font-bold">Delete comment</h3>
                        <p className="text-grayish-blue leading-6">Are you sure you want to delete this comment? This will remove the comment and can’t be undone.</p>
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