
export default function LogoutButton({onLogout}){
    return(
        <button
        className="bg-gray-500 p-1 text-white rounded-lg"
        onClick={ ()=>onLogout()}>
            登出
        </button>
    )
}