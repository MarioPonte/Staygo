import getComments, { ICommentsParams } from "./actions/getCommentsTest";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";

export const dynamic = 'force-dynamic'

const GetAllComments = async () => {

  // This is a test
  const comments = await getComments();

  if (comments.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <Container>
        <div className="mt-8">
          <div className="mb-4">
            Teste Comentários:
          </div>
          {comments.map((comment) => {
            return (
              <div key={comment.id}>
                {comment.description}
              </div>
            )
          })}
        </div>
      </Container>
    </ClientOnly>
  )
}

export default GetAllComments;
