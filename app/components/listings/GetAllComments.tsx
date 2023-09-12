'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from 'date-fns';
import Avatar from "../Avatar";

function GetAllCommentsInfo({ users, comments }: { users: any; comments: any }) {
    const getUserByUserId = (userId: any) => {
        return users.find((user: any) => user.id === userId);
    };

    return (
            <div>
                {comments.map((comment: any) => (
                    <div key={comment.id} className="mt-4 flex flex-row">
                        {getUserByUserId(comment.userId) && (
                            <div>
                                <Avatar src={getUserByUserId(comment.userId)?.image} />
                            </div>
                        )}
                        <div className="ml-4">
                            <div className="font-bold text-sm">
                                {getUserByUserId(comment.userId) && (
                                    <div>
                                        {getUserByUserId(comment.userId).name}
                                    </div>
                                )}
                            </div>
                            <div className="text-sm">
                                {comment.description}
                            </div>
                            <div className="text-xs font-light text-neutral-500">
                                {format(new Date(comment.createdAt), 'MMMM yyyy')}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
    );
}

export default function GetAllComments() {
    
    const [commentData, setCommentData] = useState([]);
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        axios.get('/api/getComments')
            .then(response => {
                setCommentData(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar os comentários:', error);
            });

        axios.get('/api/getUserById')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar os utilizadores:', error);
            });
    }, []);

    return (
        <div className="App">
            <GetAllCommentsInfo users={users} comments={commentData} />
        </div>
    )
}