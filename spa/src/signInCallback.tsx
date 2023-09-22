import { UserManager } from "oidc-client-ts"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

type SignInCallBackProps = {
  userManager: UserManager
}

export default function SignInCallBack({ userManager }: SignInCallBackProps) {
  const navigate = useNavigate();

  useEffect(() => { 
    userManager.signinCallback()
      .catch((e) => console.error(e))
      .finally(() => navigate("/protected"));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (<>Silent Callback</>)
}