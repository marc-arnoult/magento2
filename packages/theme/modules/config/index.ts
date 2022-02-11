import { useContext } from '@nuxtjs/composition-api';

export default function () {
  const context = useContext();
  console.log(context, 'CONTEXT');
}
