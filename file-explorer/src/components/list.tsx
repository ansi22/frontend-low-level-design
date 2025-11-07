import { useState } from "react";
import {
  addFolderIcon,
  addIcon,
  deleteIcon,
  editIcon,
  fileImageIcon,
  minusIcon,
} from "../data";
import "./App.css";

/**
 * render list of data
 * @param param0
 * @returns
 */
const List = ({
  list,
  addNodeToList,
  deleteNodeFromList,
  editNode,
  setData,
}: any) => {
  const [isExpanded, setExpanded] = useState<any>({});
  return (
    <div className="container">
      {list.map((node: any) => {
        return (
          <div key={node.id}>
            {node.isFolder ? (
              <span
                onClick={() => {
                  setExpanded((prev: any) => ({
                    ...prev,
                    [node.name]: !prev[node.name],
                  }));
                }}
                className="folder"
              >
                {isExpanded?.[node.name] ? (
                  <img
                    src={minusIcon}
                    alt="minus-icon"
                    width={12}
                    height={12}
                  />
                ) : (
                  <img src={addIcon} alt="add-icon" width={14} height={14} />
                )}
                <span>{node.name}</span>
                <img
                  src={addFolderIcon}
                  alt="add-icon"
                  width={20}
                  height={20}
                  onClick={(e) => {
                    e.preventDefault();
                    addNodeToList(node.id, setData);
                  }}
                />
                <img
                  src={editIcon}
                  alt="file-icon"
                  width={16}
                  height={16}
                  onClick={(e) => {
                    e.preventDefault();
                    editNode(node.id, setData);
                  }}
                />
                <img
                  src={deleteIcon}
                  alt="add-icon"
                  width={22}
                  height={22}
                  onClick={(e) => {
                    e.preventDefault();
                    deleteNodeFromList(node.id, setData);
                  }}
                />
              </span>
            ) : (
              <span className="file">
                {node.name}
                <img
                  src={fileImageIcon}
                  alt="file-icon"
                  width={20}
                  height={16}
                />
                <img
                  src={editIcon}
                  alt="file-icon"
                  width={16}
                  height={16}
                  onClick={(e) => {
                    e.preventDefault();
                    editNode(node.id, setData);
                  }}
                />
                <img
                  src={deleteIcon}
                  alt="add-icon"
                  width={22}
                  height={22}
                  onClick={(e) => {
                    e.preventDefault();
                    deleteNodeFromList(node.id, setData);
                  }}
                />
              </span>
            )}

            {isExpanded?.[node.name] && node.children && (
              <List
                list={node.children}
                addNodeToList={addNodeToList}
                deleteNodeFromList={deleteNodeFromList}
                editNode={editNode}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default List;
