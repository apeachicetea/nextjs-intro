import { useRouter } from "next/router";

export default function Detail({ params }) {
  const router = useRouter();
  console.log(router);
  const [title, id] = params || [];
  return (
    <div>
      <h4>{title}</h4>
    </div>
  );
}

export function getServerSideProps({ params: { params } }) {
  return {
    props: {
      params,
    },
  };
}
