"use client";
import "react-quill/dist/quill.bubble.css";
import ReactQuill from "react-quill";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
interface IssueFormData {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();

  const { register, control, handleSubmit } = useForm<IssueFormData>();
  return (
    <div className="flex justify-center items-center mt-4 ">
      <div className="form-container">
        <form
          className="form"
          onSubmit={handleSubmit(
            async (data) =>
              await axios.post("/api/issues", data).then(() => {
                router.push("/issues");
              })
          )}
        >
          <div className="form-group">
            <input
              required
              placeholder="Enter title"
              type="text"
              {...register("title")}
            />
          </div>
          <div className="form-group">
            <Controller
              name="description"
              rules={{ required: true }}
              control={control}
              render={({ field }) => (
                <ReactQuill
                  theme="bubble"
                  placeholder="Enter description"
                  {...field}
                />
              )}
            />
          </div>
          <button type="submit" className="form-submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default NewIssuePage;
