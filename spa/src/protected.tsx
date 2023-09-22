import { Box, Button, Stack } from '@mui/material';
import { User, UserManager } from 'oidc-client-ts';
import { useEffect, useState } from 'react';

type ProtectedProps = {
  userManager: UserManager
}

export default function Protected({ userManager }: ProtectedProps) { 
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => { 
    userManager.getUser()
      .catch(e => console.error(e))
      .then(r => setUser(r!));
  }, []);
  return (
    <Stack>
      <Box>
        {user ? JSON.stringify(user) : 'not logged in'}
        <Button onClick={async () => { 
          const response = await fetch('https://localhost:7190/WeatherForecast', {
              method: 'GET',
              headers: {
                  Authorization: `Bearer ${user!.access_token}`,
              },
          });
          console.log(response);
        }}>Hit Api</Button>
      </Box>
    </Stack>
  )
}