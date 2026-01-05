
import { Link } from 'react-router';
import { toast } from 'react-hot-toast';
import { PenSquareIcon, Trash2Icon } from 'lucide-react';
import { formatDate } from '../lib/utils.js';
import api from '../lib/axios.js';

function Notecard({ note, setNotes }) {
    const handleDelete = async (e, id) => {
        e.preventDefault();  // doesn't redirect to the card's detail page

        if (!window.confirm("Are you sure that you want to delete this note?")) return;

        try {
            await api.delete(`/notes/${id}`);
            setNotes((prev) => prev.filter(note => note._id != id));  // gets rid of the deleted note and causes a re-render
            toast.success("Note deleted successfully");
        }
        catch (error) {
            console.log(`Error deleting the note: ${error}`);
            toast.error("Failed to delete the note");
        }
    }

    return (
        <Link to={ `/note/${note._id}` } className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]">
            <div className="card-body">
                <h3 className="card-title text-base-content">{ note.title }</h3>
                <p className="text-base-content/70 line-clamp-3">{ note.content }</p> 
                <div className="card-actions justify-between items-center mt-4">
                    <span className="text-sm text-base-content/60">
                        { formatDate(new Date(note.createdAt)) }
                    </span>
                    <div className="flex items-center gap-1">
                        <PenSquareIcon className="size-4" />
                        <button className="btn btn-ghost btn-xs text-error" onClick={ (e) => handleDelete(e, note._id) }>
                            <Trash2Icon className="size-4" />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default Notecard;
