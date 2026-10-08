from fastapi import HTTPException, status


def raise_mapping_unavailable(requirement_id: str, reason: str) -> None:
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail={
            "requirement_id": requirement_id,
            "message": "This route is specified but is not implementable from the approved database mapping.",
            "clarification_required": reason,
        },
    )
