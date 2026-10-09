import { FiTrash2 } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { deleteProfile } from "../../../../services/operations/SettingsAPI"

export default function DeleteAccount() {
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function handleDeleteAccount() {
    try {
      dispatch(deleteProfile(token, navigate))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
  <>
    <div className="my-10 flex w-full flex-row gap-x-5 rounded-xl border-[1px] border-richblack-700 bg-richblack-800 p-6 px-8 shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
      
      {/* Delete Icon */}
      <div className="flex aspect-square h-14 w-14 shrink-0 items-center justify-center rounded-full bg-pink-700/20">
        <FiTrash2 className="text-2xl text-pink-200" />
      </div>

      <div className="flex flex-1 flex-col space-y-2">
        
        <h2 className="text-lg font-semibold text-richblack-5">
          Delete Account
        </h2>

        <div className="max-w-2xl text-sm leading-6 text-richblack-300">
          <p className="text-richblack-100">
            Would you like to delete account?
          </p>

          <p className="mt-1">
            This account may contain Paid Courses. Deleting your account is
            permanent and will remove all the contain associated with it.
          </p>
        </div>

        <button
          type="button"
          className="mt-2 w-fit cursor-pointer rounded-md border border-pink-700/40 bg-pink-700/10 px-4 py-2 text-sm font-medium text-pink-200 transition-all duration-200 hover:border-pink-600 hover:bg-pink-700/20 hover:text-pink-100"
          onClick={handleDeleteAccount}
        >
          I want to delete my account.
        </button>

      </div>
    </div>
  </>
);
}