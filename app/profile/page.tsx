import { cookies } from 'next/headers';

import { getDictionary } from '../../dictionaries';
import { getSession } from '@auth0/nextjs-auth0';
import ProfileInfo from '../components/Profile/ProfileInfo';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { NextPage } from 'next';
import { fetchAuth0UserWithMetadataAndRoles } from '../../userActions';

const page: NextPage = withPageAuthRequired(
  async () => {
    const lang = cookies().get('locale')?.value;
    const dict = await getDictionary(lang as string);
    const session = await getSession();
    const userFullInfo: User = await fetchAuth0UserWithMetadataAndRoles(session!.user.sub);

    return (
      <main className="lg:min-h-[calc(100vh-80px)] ">
        <ProfileInfo dict={dict} userFullInfo={userFullInfo} />
      </main>
    );
  },
  { returnTo: '/api/auth/login' }
);
export default page;
