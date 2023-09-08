'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";

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
                    {commentData.map(comment => "comentario ")}
                </div>
            ) : (
                <p>Nenhum comentário encontrado.</p>
            )}
        </div>
    )
}