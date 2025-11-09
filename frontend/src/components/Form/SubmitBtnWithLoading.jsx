const SubmitBtnWithLoading = ({ title = "Submit", isLoading = false }) => {
    return (
        <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isLoading}
        >
            {isLoading ? (
                <>
                    <span className="h-5 w-5 loading loading-spinner"></span>
                    Loading...
                </>
            ) : (
                title
            )}
        </button>
    );
};

export default SubmitBtnWithLoading;
