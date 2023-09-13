import getComments, { ICommentsParams } from "./actions/getCommentsTest";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";

export const dynamic = 'force-dynamic'

const Home = async (searchParamsCom: any) => {

  // This is a test
  const comments = await getComments(searchParamsCom);

  console.log(comments);

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
            Teste Comentários
          </div>
          {comments.map((comment) => {
            return (
              <div>
                Oi
              </div>
            )
          })}
        </div>
      </Container>
    </ClientOnly>
  )
}

export default Home;
