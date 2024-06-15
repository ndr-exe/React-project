import { cookies } from 'next/headers';

import { getDictionary } from '../../dictionaries';
import { getSession } from '@auth0/nextjs-auth0';
import ProfileInfo from '../components/Profile/ProfileInfo';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { NextPage } from 'next';
import { fetchAuth0UserWithMetadataAndRoles } from '../../userActions';
const hey = process.env.AUTH0_METADATA_EDIT;

const page: NextPage = withPageAuthRequired(
  async () => {
    const lang = cookies().get('locale')?.value;
    const { profile: localDict } = await getDictionary(lang as string);
    const session = await getSession();
    const userFullInfo: User = await fetchAuth0UserWithMetadataAndRoles(session!.user.sub);
    console.log(userFullInfo);

    return (
      <main className="lg:min-h-[calc(100vh-80px)] lg:flex lg:items-center ">
        <ProfileInfo localDict={localDict} userFullInfo={userFullInfo} />
      </main>
    );
  },
  { returnTo: '/api/auth/login' }
);
export default page;
