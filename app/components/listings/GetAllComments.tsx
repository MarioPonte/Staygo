'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from 'date-fns';

function GetAllCommentsInfo({ users, comments }: { users: any; comments: any }) {
    const getUserByUserId = (userId: any) => {
        return users.find((user: any) => user.id === userId);
    };

    return (
        <>

            <div>
                {comments.map((comment: any) => (
                        <div key={comment.id} className="mt-4 flex flex-row">
                            <div>
                            </div>
                            <div className="ml-4">
                                <div className="font-bold text-sm">
                                    {getUserByUserId(comment.userId) ? (
                                        <div>
                                            {getUserByUserId(comment.userId).name}
                                            {/* Outras informações do usuário podem ser exibidas aqui */}
                                        </div>
                                    ) : (
                                        "Usuário desconhecido"
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

        </>
    );
}

export default function GetAllComments() {

    const [commentData, setCommentData] = useState([]); // Estado para armazenar os dados dos comentários
    const [users, setUsers] = useState<any[]>([]);

    // Função para buscar os comentários da API usando Axios
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
    }, []); // Executa somente uma vez após a montagem do componente

    return (
        <div className="App">
            <GetAllCommentsInfo users={users} comments={commentData} />
        </div>
    )
}