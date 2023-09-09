'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from 'date-fns';

export default function GetAllComments() {

    const [commentData, setCommentData] = useState([]); // Estado para armazenar os dados dos comentários

    // Função para buscar os comentários da API usando Axios
    useEffect(() => {
        axios.get('/api/getComments')
            .then(response => {
                setCommentData(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar os comentários:', error);
            });
    }, []); // Executa somente uma vez após a montagem do componente

    return (
        <div>
            {commentData.length > 0 ? (
                <div>
                    {commentData.map(comment => (
                        <div key={comment["id"]} className="mt-4 flex flex-row">
                        <div>
                            
                        </div>
                        <div className="ml-4">
                            <div className="font-bold text-sm">
                                Mário
                            </div>
                            <div className="text-sm">
                                {comment["description"]}
                            </div>
                            <div className="text-xs font-light text-neutral-500">
                                {format(new Date(comment["createdAt"]), 'MMMM yyyy')}
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            ) : (
                <p>Nenhum comentário encontrado.</p>
            )}
        </div>
    )
}