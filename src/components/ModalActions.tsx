import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ActionMenuProps {
  open: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  setOpen?: () => void;
}

const ActionMenu = ({ open, onEdit, onDelete, setOpen }: ActionMenuProps) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute left-2 mt-4 -top-2 w-30 bg-white shadow-lg shadow-black/20 rounded-lg overflow-hidden z-50"
        >
          <div>
           <div  className="absolute top-1 right-1 text-red-500 cursor-pointer  p-1">
             <X size={18}
              onClick={(e) => {
                e.stopPropagation();
                setOpen?.();
              }}
             
            />
           </div>
            <button
              onClick={onEdit}
              className="block w-full px-4 py-2 text-left text-sm hover:bg-sky-50"
            >
              Editar
            </button>

            <button
              onClick={onDelete}
              className="block w-full px-4 py-2 text-left text-sm hover:bg-sky-50 text-red-600"
            >
              Excluir
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ActionMenu;
